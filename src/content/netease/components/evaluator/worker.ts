import { clearEchoed, echo } from "../console/Console";
import { CommentItem, getConfig } from "../../../../utils/storage";

enum ValidateFailReason {
  TIMES_OUT_OF_BOUND = "份数应当在 1 ~ 30 之间",
  FREQUENCY_OUT_OF_BOUND = "频率应当在 4 ~ 30 之间",
  NO_COMMENT_SAVED = "没有启用的备选评语\n请前往设置页面添加",
  WRONG_PAGE = "当前页面不是互评页面\n请进入互评页面后使用"
}

enum State {
  START = "启动互评中...",
  WORKING = "正在进行第{c}份 ( {c}/{t} )",
  ERROR = "互评第{c}份时失败 {r}",
  DONE = "互评已完成 ( {c}/{t} )"
}

export class EvaluatorWorker {
  private static workInterval: number;
  private static times: number;
  private static current: number;
  private static frequency: number;
  private static clickDelay: number;
  private static random: boolean;
  private static comment: string;
  private static commentList: CommentItem[];
  private static stopCallback: () => void;

  // 返回一个bool表示是否正常开始了任务
  public static async run(
    times: number,
    frequency: number,
    random: boolean,
    comment: string,
    startCallback: (result: boolean) => void,
    stopCallback: () => void
  ): Promise<void> {
    this.times = times;
    this.frequency = frequency * 1000;
    this.clickDelay = this.frequency * 0.5;
    this.random = random;
    this.comment = comment;
    this.current = 0;
    this.stopCallback = stopCallback;
    clearEchoed();

    if (await this.prepare()) {
      echo(State.START);
      this.startWork();
      startCallback(true);
    } else {
      startCallback(false);
    }
  }

  // 终止任务
  public static stop(): void {
    clearInterval(this.workInterval);
    this.stopCallback();
    echo(
      (State.DONE as string)
        .replace("{c}", this.current.toString())
        .replace("{t}", this.times.toString())
    );
  }

  // 开始并调度任务
  private static startWork(): void {
    this.workInterval = Number(setInterval(() => this.work(), this.frequency));
  }

  // 单项任务的处理方法
  private static work(): void {
    this.current++;

    echo(
      (State.WORKING as string)
        .replace(/{c}/g, this.current.toString())
        .replace("{t}", this.times.toString())
    );

    const scoreInputs: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".s"
    );
    const commentInputs: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll(
      "textarea.j-textarea"
    );
    const submitButton: HTMLInputElement | null = document.querySelector(
      ".j-submitbtn"
    );

    if (!scoreInputs.length || !commentInputs.length || !submitButton) {
      echo(
        (State.ERROR as string)
          .replace("{c}", this.current.toString())
          .replace("{r}", "非互评页面")
      );
      this.current--;
      this.stop();
      return;
    }

    scoreInputs.forEach(e => {
      (e.children[e.children.length - 1]
        .children[0] as HTMLInputElement).checked = true;
    });

    commentInputs.forEach(e => {
      e.value = this.random ? this.getRandomComment() : this.comment;
    });

    submitButton.click();
    setTimeout(() => {
      if (this.current === this.times) {
        (document.getElementsByClassName(
          "j-backbtn"
        )[0] as HTMLInputElement).click();
        this.stop();
      } else {
        (document.getElementsByClassName(
          "j-gotonext"
        )[0] as HTMLInputElement).click();
      }
    }, this.clickDelay);
  }

  // 初始化任务
  private static async prepare(): Promise<boolean> {
    // 检查页面
    if (!this.validatePage()) {
      return false;
    }
    // 检查数值
    if (!this.validateNums(this.times, this.frequency)) {
      return false;
    }
    if (this.random) {
      // 检查随机评语
      await this.getCommentList();
      if (!this.validateRandom(this.commentList)) {
        return false;
      }
    }
    return true;
  }

  private static getRandomComment(): string {
    return this.commentList[Math.floor(Math.random() * this.commentList.length)]
      .text;
  }

  private static async getCommentList(): Promise<void> {
    this.commentList = (await getConfig()).commentList.filter(i => i.active);
  }

  private static validateNums(times: number, frequency: number): boolean {
    if (times < 1 || times > 30) {
      echo(ValidateFailReason.TIMES_OUT_OF_BOUND);
      return false;
    }
    if (frequency < 2 * 1000 || frequency > 12 * 1000) {
      echo(ValidateFailReason.FREQUENCY_OUT_OF_BOUND);
      return false;
    }
    return true;
  }

  private static validateRandom(commentList: CommentItem[]): boolean {
    if (!commentList.length) {
      echo(ValidateFailReason.NO_COMMENT_SAVED);
      return false;
    }
    return true;
  }

  private static validatePage(): boolean {
    if (!document.getElementsByClassName("j-backbtn").length) {
      echo(ValidateFailReason.WRONG_PAGE);
      return false;
    }
    return true;
  }
}
