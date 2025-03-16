const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: "production",
    entry: {
        popup: "./src/popup.js",
        background: "./src/background.js",
        contentScript: "./src/contentScript.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new Dotenv()
    ],
    resolve: {
        extensions: [".js"]
    }
};
