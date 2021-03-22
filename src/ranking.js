/**
 * ランキングデータ操作
 *
 * @version 1.0.0
 * @author M.Katsube
 */

//--------------------------------------------
// モジュール
//--------------------------------------------
const Datastore = require('nedb')
const path = require('path')

/**
 * RankingModelクラス
 */
class RankingModel{
  /**
   * コンストラクタ
   *
   */
  constructor(){
    // data/ranking.nedbへのフルパスを作成
    const file = path.join(__dirname, '../data/ranking.nedb')
                      .replace('app.asar', 'app.asar.unpacked')

    // NeDBを開く
    this._db = new Datastore({filename:file, autoload:false})
    this._load = false
  }

  /**
   * NeDBにデータをロードする
   *
   * @returns {Promise}
   */
  load(){
    return new Promise((resolve, reject) => {
      this._db.loadDatabase( (err)=>{
        if(err){
          reject(err)
        }
        else{
          this._load = true
          resolve(true)
        }
      })
    })
  }

  /**
   * レコードを返却
   *
   * @param {number} [offset=0] 開始位置
   * @param {number} [limit=10] 個数
   * @returns {Promise}
   */
  async getData(offset=0, limit=10){
    if( ! this._load ){
      await this.load()
    }

    return new Promise((resolve, reject) => {
      this._db
          .find({})         // 全レコードを取得
          .sort({id:1})     // idで昇順にソート
          .skip(offset)     // offset位置まで移動
          .limit(limit)     // 個数制限
          .exec((err, doc)=>{
            err? reject(err):resolve(doc)
          })
    })
  }
}

//--------------------------------------------
// exports
//--------------------------------------------
const rank = new RankingModel()
module.exports = rank