# Electron Sample - NeDB
NeDBをマスターデータの格納先として利用するサンプルです。アプリ内に埋め込んでマスターデータとして利用する方法と、起動時にNeDB用のファイルを作成し書き込みを行っています。

## 解説ページ
* [[Electron] NeDBでデータを管理する](https://blog.katsubemakito.net/nodejs/electron/nedb-with-electron)

## 準備
Gitでリポジトリを取得します。
```shellsession
$ git clone https://github.com/katsube/electron-sample-nedb
```

Node.jsがインストールされている環境で以下のコマンドを実行し、必要なライブラリを取得します。
```shellsession
$ cd electron-sample-nedb
$ npm install
```

## 実行方法
以下でプレビューを行います。
```shellsession
$ npm start
```

以下のビルド用コマンドを叩くと、各OS用のインストーラーが作成されます。
```shellsession
$ npm run build-win
$ npm run build-mac
```
