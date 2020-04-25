const path = require("path");
const webpack = require("webpack");
const ZipPlugin = require("zip-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const sourcePath = path.join(__dirname, "src");
const assetsPath = path.join(sourcePath, "assets");
const viewsPath = path.join(assetsPath, "views");
const destPath = path.join(__dirname, "extension");
const nodeEnv = process.env.NODE_ENV || "development";
const targetBrowser = process.env.TARGET_BROWSER;

const extensionReloaderPlugin =
  nodeEnv === "development"
    ? new ExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: "content",
        background: "background",
        extensionPage: ["popup", "options"]
      }
    })
    : () => {
      this.apply = () => {
      };
    };

const getExtensionFileType = browser => {
  if (browser === "opera") {
    return "crx";
  }

  if (browser === "firefox") {
    return "xpi";
  }

  return "zip";
};

module.exports = {
  mode: nodeEnv,

  entry: {
    manifest: path.join(sourcePath, "manifest.json"),
    background: path.join(sourcePath, "background", "index.ts"),
    content_netease: path.join(sourcePath, "content", "netease", "index.tsx"),
    content_ulearning: path.join(sourcePath, "content", "ulearning", "index.tsx"),
    options: path.join(sourcePath, "options", "index.tsx")
  },

  output: {
    filename: "js/[name].bundle.js",
    path: path.join(destPath, targetBrowser)
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "webextension-polyfill-ts": path.resolve(
        path.join(__dirname, "node_modules", "webextension-polyfill-ts")
      ),

      "@": path.resolve("src")
    }
  },

  module: {
    rules: [
      {
        type: 'javascript/auto', // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
          loader: 'wext-manifest-loader',
          options: {
            usePackageJSONVersion: true, // set to false to not use package.json version for manifest
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")()]
            }
          },
          "resolve-url-loader",
          "less-loader"
        ]
      }
    ]
  },

  plugins: [
    new WextManifestWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV", "TARGET_BROWSER"]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(process.cwd(), `extension/${targetBrowser}`),
        path.join(
          process.cwd(),
          `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`
        )
      ],
      cleanStaleWebpackAssets: false,
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(viewsPath, "options.html"),
      inject: "body",
      chunks: ["options"],
      filename: "options.html"
    }),
    new MiniCssExtractPlugin({filename: "css/[name].css"}),
    new CopyWebpackPlugin([{from: "src/assets", to: "assets"}]),
    extensionReloaderPlugin
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
      }),
      new ZipPlugin({
        path: destPath,
        extension: `${getExtensionFileType(targetBrowser)}`,
        filename: `${targetBrowser}`
      })
    ]
  }
};
