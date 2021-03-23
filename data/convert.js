/**
 * TSV -> NeDBコンバーター
 *
 * タブ区切りテキストファイル(ranking.tsv)を読み込み、
 * NeDB用のデータファイル(ranking.nedb)を生成します。
 *
 * 使用方法)
 *  $ node convert.js
 *
 * @author M.Katsube < katsubemakito@gmail.com >
 */

//--------------------------------------
// 定数
//--------------------------------------
const FILE_TSV = 'ranking.tsv'      // 変換元のファイル
const FILE_NEDB = 'ranking.nedb'    // 出力先のファイル

//--------------------------------------
// モジュール
//--------------------------------------
const Datastore = require('nedb')
const fs = require('fs')
const readline = require('readline')

//--------------------------------------
// 変換
//--------------------------------------
// NeDBを準備
const db = new Datastore({filename:FILE_NEDB, autoload:true})

// Streamを準備
const stream = fs.createReadStream(FILE_TSV, {
                  encoding: 'utf8',         // 文字コード
                  highWaterMark: 1024       // 一度に取得するbyte数
                })

// NeDBへ変換
const reader = readline.createInterface({ input: stream })
reader.on('line', (data) => {
  const [id, title, publisher] = data.split("\t")
  const param = {
    id: Number(id),
    title,
    publisher
  }

  // NeDBへ挿入
  db.insert(param, (err)=>{
    if(err)
      throw err
  })
})
