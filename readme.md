# 輪盤遊戲

## how to start?
* 尚無 event page sample，只build的出js，沒有畫面。
```shell script
# 安裝套件
yarn

# 啟動測試 server
yarn start
```

## preview
```shell script
# dev
http://localhost:5657
```

## using
* webpack（see `webpack.config.js`）
* dotenv 
  * 有拆成各環境不同的 env file（see `webpack.config.js`中的`processEnvFile`)
  * 將環境變數引入程式碼中（see `webpack.config.js` 中 `DefinePlugin`）
* babel (see `package.json` & `.babelrc`)
* eslint（see `package.json` & `.eslintrc.js` & `.eslintignore` ）
* jquery(這邊沒引入，因為event html有直接掛了)
* jquery-modal
* jquery-rotate (旋轉功能靠他惹)
* prettier
* express (local dev server)

## 輪盤結構 & sample file 
待補

## 自己筆記，以後可以回鍋的地方
* exception
* cookie bear
* 其實也可以弄 sample 到 heroku 上
