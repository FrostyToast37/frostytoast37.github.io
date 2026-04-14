//=============================================================================
// UTA_CommonSave.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc Create a share save data. Share state of game switch and variables between each save data.
 * @author t-akatsuki
 * 
 * @param Target Switches
 * @desc Set target switch index number.
 * If you want to set multiple, put comma between indexes.
 * Using "-", the range can be specified.
 * (ex) 1-3,11,12,13,20,21
 * @default 
 * 
 * @param Target Variables
 * @desc Set target variable index number.
 * If you want to set multiple, put comma between indexes.
 * Using "-", the range can be specified.
 * (ex) 1-5,11,12,13,23,24
 * @default 
 * 
 * @param Is Auto
 * @desc Automatically to set save / load common save data on save / load timing.
 * true  : Automatically common save data is saved/loaded on save / load timing.
 * false : Save and load of common save data you do manually.
 * @default true
 * 
 * @param Auto on Gameover
 * @desc If auto saving common save data is enabled , it automatically saves common save data on gameover.
 * true  : It save common save data on game over.
 * false : It do nothing on game over. 
 * @default false
 * 
 * @param Show Trace
 * @desc Set state traces display.
 * true  : Show trace., false : Don't show trace.
 * @default false
 * 
 * @help # Overview
 * Create a share save data. Share state of game switch and variables 
 * between each save data.
 * If you use plugin command, you can operate common save data at any time.
 * 
 * Common save data will be saved with a name "common.rpgsave" 
 * below save directory.
 * 
 * # Parameters
 *   Target Switches [Switch No, ...]
 *     Set target switch index number.
 *     If you want to set multiple, put comma between indexes.
 *     Using "-", the range can be specified.
 *     (Ex) 1-3,11,12,13,20,21
 *            => number 1,2,3,11,12,13,20,21 switches are target.
 * 
 *   Target Variables [Valiable No, ...]
 *     Set target variable index number.
 *     If you want to set multiple, put comma between indexes.
 *     Using "-", the range can be specified.
 *     (Ex) 1-3,11,12,13,14,15
 *            => number 1,2,3,11,12,13,14,15 variables are target.
 * 
 *   Is Auto [true|false]
 *     Automatically to set save / load common save data on save / load timing.
 * 
 *   Auto on Gameover [true|false]
 *     If auto saving common save data is enabled, 
 *     It automatically saves common save data on gameover.
 * 
 *   Show Trace [true|false]
 *     Set whether the issue a trace for debugging.
 * 
 * # Plugin Command
 *   CommonSave load
 *     Read GameSwitches and GameVariables from common save data 
 *     and apply game data.
 *     This command is used when you want to load common save data 
 *     at any time.
 * 
 *   CommonSave save
 *     Save target GameSwitches and GameVariables common save data.
 *     This command is used when you want to save in common save data 
 *     at any time.
 * 
 *   CommonSave remove
 *     Remove common save data file.
 * 
 *   CommonSave setTrace [true|false]
 *     Setting to enabled trace on console.
 * 
 *   CommonSave check
 *     Show sharing target switches and variables to console.
 * 
 * # Information
 *   Version: 1.30
 *   License: MIT License
 *   Web site:
 *   - Official Web site:
 *      https://www.utakata-no-yume.net/
 *   - Plugin page:
 *      https://www.utakata-no-yume.net/gallery/plugin/tkmv/cmn_save/
 *   - Contact:
 *      https://www.utakata-no-yume.net/contact/rpgmvmz/
 *   - GitHub repository:
 *      https://github.com/t-akatsuki/UTA_CommonSaveMV
 * 
 * # Change Log
 *   ver 1.30 (Dec 05, 2024)
 *     Add backup/restore function to match core script save function.
 *     If common save data corruption is detected during loading, 
 *     Restore common save data from existing backup.
 *     Fix problem if you reduce shared targets, 
 *     The excluded targets will be loaded when loading.
 *     Add JSDoc comments in code. Enhanced type safety.
 *     Improved code readability and help document readability.
 * 
 *   ver 1.20 (May 11, 2016)
 *     Using "-", the range can be specified.
 *     Add setTrace plugin command.
 *     Add check plugin command.
 * 
 *   ver 1.10 (Fed 17, 2016)
 *     Rename to UTA_CommonSave.js.
 *     To be able to set trace in the parameter.
 * 
 *   ver1.01 (Jan 14, 2016)
 *     Fixed bug where could not share variables.
 * 
 *   ver1.00 (Dec 31, 2015)
 *     To ver1.00 according to the Japanese version of RPG Maker MV.
 * 
 *   ver0.01 (Nov 05, 2015)
 *     Initial release.
 */

/*:ja
 * @plugindesc 共有のセーブデータを作成し、指定したスイッチ・変数の状態をセーブデータ間で共有します。
 * @author 赤月 智平
 * 
 * @param Target Switches
 * @desc 対象となるスイッチの番号を指定します。
 * カンマ区切りで複数指定、ハイフンで範囲指定が可能です。
 * (例) 1-3,11,12,13,20,21
 * @default 
 * 
 * @param Target Variables
 * @desc 対象となる変数の番号を指定します。
 * カンマ区切りで複数指定、ハイフンで範囲指定が可能です。
 * (例) 1-5,11,12,13,23,24
 * @default 
 * 
 * @param Is Auto
 * @desc セーブ・ロード時に自動的に共通セーブデータのセーブ・ロードを行うかを設定します。
 *       true  : セーブ・ロード時に自動的に共有セーブデータにデータのセーブ・ロードを行う。
 *       false : 共通セーブデータのセーブ・ロードは手動で行う。
 * @default true
 * 
 * @param Auto on Gameover
 * @desc 自動セーブ設定がONの時にゲームオーバー時に共有セーブデータの自動セーブを行うかを設定します。
 *       true  : ゲームオーバー時に自動共有セーブを行う。
 *       false : ゲームオーバー時は自動共有セーブを行わない。
 * @default false
 * 
 * @param Show Trace
 * @desc デバッグ用のトレースを出すかを設定します。
 * true: トレースを表示, false: トレースを表示しない
 * @default false
 * 
 * @help ■概要
 * CommonSaveプラグインは共有セーブデータを作成し、指定したスイッチ・変数の状態を
 * セーブデータ間で共有する事ができます。
 * 基本的にはセーブ・ロード時に設定に応じて自動的に処理してくれます。
 * プラグインコマンドを利用すると、任意のタイミングで共有セーブデータの操作を
 * 行う事ができます。
 *
 * 共有セーブデータはsaveディレクトリ以下に「common.rpgsave」という名前で
 * 保存されます。
 * 
 * ■パラメータの説明
 *   Target Switches [スイッチ番号, ...]
 *     共有したいスイッチの番号を指定します。
 *     「,」で区切り複数の値を指定する事ができます。
 *     「-」で数値の範囲を指定する事も可能です。
 *     (例) 1-3,11,12,13,20,21
 *            => 1,2,3,11,12,13,20,21番のスイッチが対象になる。
 * 
 *   Target Variables [変数番号, ...]
 *     共有したい変数の番号を指定します。
 *     「,」で区切り複数の値を指定する事ができます。
 *     「-」で数値の範囲を指定する事も可能です。
 *     (例) 1-3,11,12,13,14,15
 *            => 1,2,3,11,12,13,14,15番の変数が対象になる。
 * 
 *   Is Auto [true|false]
 *     セーブ・ロード時に自動的に共通セーブデータのセーブ・ロードを
 *     行うかを設定します。
 *     デフォルトはtrue(セーブ・ロード時に自動的に共有セーブ・ロードを行う)です。
 * 
 *   Auto on Gameover [true|false]
 *     自動セーブ設定がONの時にゲームオーバー時に共有セーブデータの
 *     自動セーブを行うかを設定します。
 *     デフォルトはfalse(ゲームオーバー時に自動共有セーブを行わない)です。
 * 
 *   Show Trace [true|false]
 *     デバッグ用のトレースを出すかを設定します。
 * 
 * ■プラグインコマンド
 *   CommonSave load
 *     共有セーブデータからスイッチ・変数を読み込み反映させます。
 *     任意のタイミングで共有セーブデータのロードを行いたい場合に使用します。
 * 
 *   CommonSave save
 *     共有セーブデータにスイッチ・変数の状態を記録します。
 *     任意のタイミングで共有セーブデータのセーブを行いたい場合に使用します。
 * 
 *   CommonSave remove
 *     共有セーブデータを削除します。
 *     共有セーブデータをリセットしたい場合に使用します。
 * 
 *   CommonSave setTrace [true|false]
 *     コンソールにトレースを出力するかを設定します。
 *     ゲーム実行中にトレース状態を切り替えたい場合に使用します。
 * 
 *   CommonSave check
 *     共有状態になっているスイッチ・変数番号をコンソールに表示し確認します。
 * 
 * ■各種情報
 *   バージョン: 1.30
 *   ライセンス: MIT License
 *   Webサイト: 
 *   - 公式サイト: 
 *       https://www.utakata-no-yume.net/
 *   - プラグイン掲載ページ: 
 *       https://www.utakata-no-yume.net/gallery/plugin/tkmv/cmn_save/
 *   - お問い合わせ: 
 *       https://www.utakata-no-yume.net/contact/rpgmvmz/
 *   - GitHubリポジトリ: 
 *       https://github.com/t-akatsuki/UTA_CommonSaveMV
 * 
 * ■更新履歴
 *   ver 1.30 (2024.12.05)
 *     コアスクリプトセーブ処理に合わせたバックアップ/復旧処理を追加。
 *     ロード時に共有セーブデータが破損していた場合、
 *     バックアップがあれば復旧を試みるように。
 *     共有対象を後から減らした場合、対象外とした対象もロード時に
 *     反映してしまう問題の対処。
 *     コード内のJSDocコメント追加。可読性の向上。型安全性の強化。
 *     ヘルプドキュメントの可読性向上。
 * 
 *   ver 1.20 (2016.05.11)
 *     スイッチ・変数の指定の際に「-」を使う事で範囲指定を可能に。
 *     トレース状態を動的に変えられるように setTrace プラグインコマンドを追加。
 *     共有対象になっているスイッチ・変数を確認できる
 *     check プラグインコマンドを追加。
 * 
 *   ver 1.10 (2016.02.17)
 *     ファイル名をUTA_CommonSave.jsに変更。
 *     トレース出力の有無をパラメータで設定できるように。
 * 
 *   ver 1.01 (2016.01.14)
 *     変数の共有が上手くできていないバグの修正。
 * 
 *   ver 1.00 (2015.12.31)
 *     日本語版RPGツクールMVの発売に合わせver1.00に。
 * 
 *   ver 0.01 (2015.11.05)
 *     初版。
 */
//=============================================================================
"use strict";

/**
 * @namespace
 */
var utakata = utakata || {};

(function(utakata) {
    /**
     * @class CommonSaveManager
     * @classdesc 共通セーブデータを管理する静的クラス。
     */
    var CommonSaveManager = (function() {
        /**
         * @constructor
         */
        function CommonSaveManager() {
            //member variables
            this._targetSwitchList = [];
            this._targetVariableList = [];

            this._showTrace = false;
            this._tr = null;

            this._initialize();
        }

        // class variables like
        /**
         * セーブファイル名。
         * @type {string}
         */
        CommonSaveManager.prototype.SAVE_FILENAME = "common.rpgsave";

        /**
         * 共通セーブのWebStorage用キー名。
         * @type {string}
         */
        CommonSaveManager.prototype.WEBSTORAGE_KEY = "RPG Common";

        /**
         * バックアップファイルの拡張子。(local版)
         * @type {string}
         */
        CommonSaveManager.prototype.BACKUP_LOCAL_EXT = ".bak";

        /**
         * バックアップ用WebStorageキーのsuffix。(web版)
         * @type {string}
         */
        CommonSaveManager.prototype.BACKUP_WEBSTORAGE_KEY_SUFFIX = ".bak";

        /**
         * 初期化処理。
         * @private
         * @method
         */
        CommonSaveManager.prototype._initialize = function() {
            this.parameters = PluginManager.parameters("UTA_CommonSave");

            this._showTrace = (String(this.parameters["Show Trace"]) === "true");

            this._tr = function(s) {
                if (!this._showTrace) { return; }
                var str = "CommonSaveManager: " + s; console.log(str);
            };

            var targetSwitchStr = String(this.parameters["Target Switches"]);
            var targetVariableStr = String(this.parameters["Target Variables"]);

            this._targetSwitchList = this._parseTargetNumber(targetSwitchStr);
            this._targetVariableList = this._parseTargetNumber(targetVariableStr);
        };

        /**
         * 引数で与えた対象番号文字列を解析し、対象番号の配列として得る。
         * @private
         * @method
         * @param {string} str 解析対象文字列。
         * @return {number[]} 対象番号の配列。
         */
        CommonSaveManager.prototype._parseTargetNumber = function(str) {
            if (typeof str === "undefined" || str === "undefined") { return []; }

            str = str.replace(/\s+/g, "");

            var split_str = ",";
            var rgn_split_str = "-";

            var indexes = str.split(split_str, -1);
            var ret = [];

            var parseTargetNumbersFromRegion = function(rgn_target) {
                var ret = [];
                var target_number = rgn_target.split(rgn_split_str, -1);
                if (typeof target_number[0] === "undefined" || typeof target_number[1] === "undefined") { return []; }

                var s_number = parseInt(target_number[0]);
                if (s_number !== s_number) {
                    this._tr("_parseTargetNumber getTargetNumbersFromRegion: Setting parameter is invalid.");
                    return [];
                }

                var e_number = parseInt(target_number[1]);
                if (e_number !== e_number) {
                    this._tr("_parseTargetNumber getTargetNumbersFromRegion: Setting parameter is invalid.");
                    return [];
                }

                for (var i = s_number; i <= e_number; i++) {
                    ret.push(i);
                }

                return ret;
            };

            for (var i = 0; i < indexes.length; i++) {
                var rgn_target = indexes[i].match(/\d+-\d+/g);
                if (!!rgn_target) {
                    var parseIndexes = parseTargetNumbersFromRegion(rgn_target[0]);
                    if (parseIndexes.length <= 0) { continue; }

                    ret = ret.concat(parseIndexes);
                } else {
                    var parseIndex = parseInt(indexes[i]);
                    if (parseIndex !== parseIndex) {
                        this._tr("_parseTargetNumber: Setting parameter is invalid.");
                        continue;
                    }
                    ret.push(parseIndex);
                }
            }
            return ret;
        };

        /**
         * 対象スイッチの状態を連想配列として得る。
         * @private
         * @method
         * @return {object} 対象スイッチ状態の連想配列。
         */
        CommonSaveManager.prototype._getTargetSwitchJson = function() {
            var json = { };

            for (var i = 0; i < this._targetSwitchList.length; i++) {
                var idx = this._targetSwitchList[i].toString();
                var value = $gameSwitches.value(idx);
                json[idx] = value;
            }

            return json;
        };

        /**
         * 対象変数状態を連想配列として得る。
         * @private
         * @method
         * @return {object} 対象変数状態の連想配列。
         */
        CommonSaveManager.prototype._getTargetVariableJson = function() {
            var json = { };

            for (var i = 0; i < this._targetVariableList.length; i++) {
                var idx = this._targetVariableList[i].toString();
                var value = $gameVariables.value(idx);
                json[idx] = value;
            }

            return json;
        };

        /**
         * 共通セーブデータをメモリ上のスイッチ・変数に展開する。
         * @private
         * @method
         * @param {object} contents ロードした共通セーブデータの連想配列。
         */
        CommonSaveManager.prototype._extractContents = function(contents) {
            if ("gameSwitches" in contents) {
                this._setLoadSwitches(contents["gameSwitches"]);
            }
            if ("gameVariables" in contents) {
                this._setLoadVariables(contents["gameVariables"]);
            }
        };

        /**
         * スイッチデータを現在のメモリ状態に反映する。
         * @private
         * @method
         * @param {object} switches ロード対象のスイッチデータ。
         */
        CommonSaveManager.prototype._setLoadSwitches = function(switches) {
            for (var key in switches) {
                var idx = parseInt(key);

                // 共有対象の場合のみ反映する
                if (this._targetSwitchList.indexOf(idx) < 0) {
                    continue;
                }

                var value = switches[key];
                $gameSwitches.setValue(idx, value);
            }
        };

        /**
         * 変数データを現在のメモリ状態に反映する。
         * @private
         * @method
         * @param {object} variables ロード対象の変数データ。
         */
        CommonSaveManager.prototype._setLoadVariables = function(variables) {
            for (var key in variables) {
                var idx = parseInt(key);

                // 共有対象の場合のみ反映する
                if (this._targetVariableList.indexOf(idx) < 0) {
                    continue;
                }

                var value = variables[key];
                $gameVariables.setValue(idx, value);
            }
        };

        /**
         * 共通セーブデータのロード処理。
         * @private
         * @method
         * @return {boolean} ロードに成功した場合はtrueを返す。
         */
        CommonSaveManager.prototype._loadWithoutRescue = function() {
            try {
                // 共通セーブデータからデータ読み込み
                var dataRaw = StorageManager.loadCommonSave();

                // ロード対象が存在しなかった場合などは何もしない
                if (dataRaw === null) {
                    return true;
                }

                // データを展開しメモリ上に反映
                // データが壊れている場合はparseで例外となる
                var data = JSON.parse(dataRaw);
                this._extractContents(data);
            } catch (e) {
                // 例外が発生した場合はfalseを返す
                // コアスクリプト側の文脈に従い例外送出は行わない
                console.error("Failed to load common save data.");
                console.error(e);
                return false;
            }

            return true;
        };

        /**
         * 共通セーブデータのセーブ処理。  
         * このメソッド内ではバックアップによるリカバリー処理を考慮しない。
         * @private
         * @method
         * @return {boolean} セーブに成功した場合はtrueを返す。
         */
        CommonSaveManager.prototype._saveWithoutRescue = function() {
            try {
                var data = {
                    "gameSwitches": this._getTargetSwitchJson(),
                    "gameVariables": this._getTargetVariableJson()
                };
    
                var jsonStr = JsonEx.stringify(data);
                StorageManager.saveCommonSave(jsonStr);
            } catch (e) {
                console.error("Failed to save common save data.");
                console.error(e);
                return false;
            }

            return true;
        };

        /**
         * 共通セーブデータをバックアップから復元する。  
         * この処理はセーブ時などに何らかの問題が発生した時に呼ばれる。  
         * コアスクリプト側のセーブ処理に合わせた形の実装とする。
         * @private
         * @method
         * @return {boolean} 正常にバックアップから復元できた場合/はtrueを返す。  
         * 復元対象が無く何も行わなかった場合もtrueを返す。
         */
        CommonSaveManager.prototype._rescue = function() {
            this._tr("Rescue common save data.");

            // バックアップが存在していないは何もしない
            if (!StorageManager.existsCommonSave(true)) {
                console.warn("Recover common save has not processed because common save backup is not found.");
                return true;
            }

            try {
                // データ破損の疑いがある共通セーブを削除
                StorageManager.removeCommonSave(false);

                // バックアップから共通セーブデータを復元
                StorageManager.restoreBackupCommonSave();
            } catch (e) {
                console.error("Failed to recover common save data.");
                console.error(e);
                return false;
            }

            console.info("Succeeded to recover common save data.");
            return true;
        };

        /**
         * 共通セーブデータのロード処理。  
         * プラグインコマンド`CommonSave load`の処理実体。  
         * 共通セーブデータが存在しない場合は何もしない。
         * @method
         * @return {boolean} ロード成功した場合trueを返す。
         */
        CommonSaveManager.prototype.load = function() {
            var ret = true;

            try {
                this._tr("Load common save data.");

                // 共通セーブデータが存在していない場合は何もしない
                // 初回の場合などであり得るシナリオ
                if (!this.exists()) {
                    return true;
                }

                ret &= this._loadWithoutRescue();
            } catch (e) {
                console.error("Failed to load common save data.");
                console.error(e);
                ret = false;
            }

            // バックアップが存在する場合は復元後にもう一度ロードを試みる
            // 本来正常シナリオではバックアップは残存していないはずだが、
            // バックアップがある場合は復旧を試みる
            if (!ret && StorageManager.existsCommonSave(true)) {
                console.warn("Detect common save backup, Try to recover common save data...");

                // バックアップからの復元を行う
                // 復元後バックアップは破棄する
                this._rescue();
                StorageManager.removeCommonSave(true);

                // 再度ロードを試みる
                ret = this.load();
                if (ret) {
                    console.info("Succeeded to recover common save data and loading.");
                } else {
                    console.error("Failed to load common save data from backup.");
                }
            }

            // バックアップが存在している && 正常に読み込めた場合は
            // バックアップは既に不要と同義
            // 事故防止のために削除しておく
            if (ret && StorageManager.existsCommonSave(true)) {
                StorageManager.removeCommonSave(true);
            }

            return ret;
        };

        /**
         * 共通セーブデータのセーブ処理。  
         * プラグインコマンド`CommonSave save`の処理実体。  
         * コアスクリプト側セーブ処理に合わせて、
         * セーブ失敗時にバックアップによるリカバリー処理を行うように。
         * @method
         * @return {boolean} セーブに成功した場合trueを返す。
         */
        CommonSaveManager.prototype.save = function() {
            var ret = true;

            try {
                this._tr("Save common save data.");

                // セーブ前にバックアップを取得する
                // 初回などの場合はバックアップ対象が無いので何もしない
                StorageManager.backupCommonSave();
                ret &= this._saveWithoutRescue();
            } catch (e) {
                console.error("Failed to save common save. Error occurred.");
                console.error(e);
                ret = false;
            }

            // セーブ処理中に何らかの問題が発生した場合は、
            // バックカップからのリカバリー処理を試行する
            if (!ret) {
                this._rescue();
            }

            // 不要になったバックアップファイルを削除する
            StorageManager.removeCommonSave(true);

            return ret;
        };

        /**
         * 共通セーブデータが存在しているかを確認する。
         * @method
         * @return {boolean} 共通セーブデータが存在している場合はtrueを返す。
         */
        CommonSaveManager.prototype.exists = function() {
            this._tr("Check exists common save data.");
            return StorageManager.existsCommonSave();
        };

        /**
         * 共通セーブデータを削除する。  
         * プラグインコマンド`CommonSave remove`の処理実体。
         * @method
         */
        CommonSaveManager.prototype.remove = function() {
            this._tr("Remove common save data.");
            StorageManager.removeCommonSave();
        };

        /**
         * デバッグトレースの表示設定を行う。  
         * プラグインコマンド`CommonSave setTrace`の処理実体。
         * @method
         * @param {any[]} args プラグインコマンド引数配列。
         */
        CommonSaveManager.prototype.setShowTrace = function(args) {
            if (!args) { return; }
            var enabled = String(args[1]) === "true" ? true : false;
            this._tr("setShowTrace: " + this._showTrace);
            this._showTrace = enabled;
        };

        /**
         * 現在共通セーブの対象としているスイッチ・変数をコンソール上に出力する。  
         * プラグインコマンド`CommonSave check`の処理実体。
         * @method
         */
        CommonSaveManager.prototype.check = function() {
            var str = "CommonSaveManager: \n";
            str += " # Share switch targets : \n";
            str += JSON.stringify(this._targetSwitchList);

            str += "\n # Share variable targets : \n";
            str += JSON.stringify(this._targetVariableList);

            console.log(str);
        };

        /**
         * 共通セーブの自動セーブ・ロードの状態を取得する。
         * @method
         * @return {boolean} true : 自動セーブ・ロード有効。 false: 自動セーブ・ロード無効。
         */
        CommonSaveManager.prototype.isAuto = function() {
            return String(this.parameters["Is Auto"]) === "true";
        };

        /**
         * ゲームオーバー時の共通セーブ自動化状態を取得する。
         * @method
         * @return {boolean} true : 自動セーブ・ロード有効。 false: 自動セーブ・ロード無効。
         */
        CommonSaveManager.prototype.isAutoOnGameOver = function() {
            return String(this.parameters["Auto on Gameover"]) === "true";
        };

        return CommonSaveManager;
    })();
    utakata.CommonSaveManager = new CommonSaveManager();

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //-----------------------------------------------------------------------------
    //parse and dispatch plugin command
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "CommonSave") {
            switch (args[0]) {
            case "load":
                utakata.CommonSaveManager.load();
                break;
            case "save":
                utakata.CommonSaveManager.save();
                break;
            case "exists":
                utakata.CommonSaveManager.exists();
                break;
            case "remove":
                utakata.CommonSaveManager.remove();
                break;
            case "setTrace": 
                utakata.CommonSaveManager.setShowTrace(args);
                break;
            case "check": 
                utakata.CommonSaveManager.check();
                break;
            default:
                break;
            }
        }
    };

    //-----------------------------------------------------------------------------
    // DataManager
    //-----------------------------------------------------------------------------
    var _Data_Manager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId) {
        var ret = _Data_Manager_loadGame.call(this, savefileId);

        if (utakata.CommonSaveManager.isAuto()) {
            ret &= utakata.CommonSaveManager.load();
        }
        return ret;
    };

    var _Data_Manager_saveGame = DataManager.saveGame;
    DataManager.saveGame = function(savefileId) {
        var ret = _Data_Manager_saveGame.call(this, savefileId);

        if (utakata.CommonSaveManager.isAuto()) {
            ret &= utakata.CommonSaveManager.save();
        }
        return ret;
    };

    var _Data_Manager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _Data_Manager_setupNewGame.call(this);
        if (utakata.CommonSaveManager.isAuto()) {
            utakata.CommonSaveManager.load();
        }
    };

    //-----------------------------------------------------------------------------
    // StorageManager
    //-----------------------------------------------------------------------------
    /**
     * 共通セーブデータをロードしてデータ文字列を得る。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {string|null} ロードした共通セーブデータのjson文字列。  
     * ロード対象が存在しない場合はnullを返す。
     */
    StorageManager.loadCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }

        var ret = null;
        if (this.isLocalMode()) {
            ret = this.loadFromLocalFileCommonSave(isBackup);
        } else {
            ret = this.loadFromWebStorageCommonSave(isBackup);
        }
        return ret;
    };

    /**
     * ローカルの共通セーブファイルからロードしたデータ文字列を得る。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {string|null} ロードした共通セーブデータのjson文字列。  
     * ロード対象が存在しない場合はnullを返す。
     */
    StorageManager.loadFromLocalFileCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        if (!this.existsCommonSave(isBackup)) {
            return null;
        }

        var filePath = this.localFilePathCommonSave(isBackup);
        var fs = require("fs");
        var data = fs.readFileSync(filePath, {
            "encoding": "utf8"
        });
        // 不正な入力の場合は空文字を返すので注意
        return LZString.decompressFromBase64(data);
    };

    /**
     * WebStorage内の共通セーブデータからロードしたデータ文字列を得る。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {string|null} ロードした共通セーブデータのjson文字列。  
     * ロード対象が存在しない場合はnullを返す。
     */
    StorageManager.loadFromWebStorageCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        if (!this.existsCommonSave(isBackup)) {
            return null;
        }

        var key = this.webStorageKeyCommonSave(isBackup);
        var data = localStorage.getItem(key);
        // 不正な入力の場合は空文字を返すので注意
        return LZString.decompressFromBase64(data);
    };

    /**
     * 共通セーブデータをファイル/WebStorageに書き出す。
     * @memberof StorageManager
     * @static
     * @method
     * @param {string} json 共通セーブ対象データのjson文字列。
     */
    StorageManager.saveCommonSave = function(jsonStr) {
        if (this.isLocalMode()) {
            this.saveToLocalFileCommonSave(jsonStr);
        } else {
            this.saveToWebStorageCommonSave(jsonStr);
        }
    };

    /**
     * 共通セーブデータをローカルセーブファイルに書き出す。
     * @memberof StorageManager
     * @static
     * @method
     * @param {string} jsonStr 共通セーブ対象データのjson文字列。
     */
    StorageManager.saveToLocalFileCommonSave = function(jsonStr) {
        var data = LZString.compressToBase64(jsonStr);
        var fs = require("fs");
        var dirPath = this.localFileDirectoryPath();
        var filePath = this.localFilePathCommonSave();
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(filePath, data);
    };

    /**
     * 共通セーブデータをWebStorageに書き出す。
     * @memberof StorageManager
     * @static
     * @method
     * @param {string} jsonStr 共通セーブ対象データのjson文字列。
     */
    StorageManager.saveToWebStorageCommonSave = function(jsonStr) {
        var key = this.webStorageKeyCommonSave();
        var data = LZString.compressToBase64(jsonStr);
        localStorage.setItem(key, data);
    };

    /**
     * 共通セーブデータのバックアップを作成する。  
     * 何かしらの要因で例外が発生した場合、安全で無いバックアップを削除し、例外の送出は行わない。
     * @memberof StorageManager
     * @static
     * @method
     */
    StorageManager.backupCommonSave = function() {
        // 共通セーブデータが存在しない場合は何もしない
        // 初回の場合にあり得るシナリオ
        if (!this.existsCommonSave(false)) {
            return;
        }

        try {
            // 既にバックアップファイルが存在している場合は削除する
            if (this.existsCommonSave(true)) {
                this.removeCommonSave(true);
            }

            var data = this.isLocalMode() ? this.loadFromLocalFileCommonSave(false) : this.loadFromWebStorageCommonSave(false);
            var compressed = LZString.compressToBase64(data);

            // バックアップに書き込み
            if (this.isLocalMode()) {
                var dirPath = this.localFileDirectoryPath();
                var filePath = this.localFilePathCommonSave(true);

                var fs = require("fs");
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
                fs.writeFileSync(filePath, compressed);
            } else {
                var key = this.webStorageKeyCommonSave(true);
                localStorage.setItem(key, compressed);
            }
        } catch (e) {
            // 元データが破損しているなどでバックアップに失敗した場合は何もしない
            console.error("Failed to backup common save.");
            console.error(e);

            // 破損の可能性のあるバックアップを削除する
            if (this.existsCommonSave(true)) {
                this.removeCommonSave(true);
            }
        }
    };

    /**
     * 共通セーブデータのバックアップレストア処理。  
     * バックアップが存在しない場合は何もしない。  
     * 復元中に例外が発生した場合はそのまま例外送出する。
     * @memberof StorageManager
     * @static
     * @method
     */
    StorageManager.restoreBackupCommonSave = function() {
        // バックアップが存在しない場合は何もしない
        if (!this.existsCommonSave(true)) {
            console.warn("Restore common save has not processed because common save backup is not found.");
            return;
        }

        try {
            // バックアップファイルからデータを読み込む
            var data = this.isLocalMode() ? this.loadFromLocalFileCommonSave(true) : this.loadFromWebStorageCommonSave(true);
            // 対象が存在しない or 空データだった場合は復元しない
            if (!data) {
                console.warn("Restore common save has not processed because backup common save data is empty.");
                return;
            }
            var compressed = LZString.compressToBase64(data);

            // 共通セーブデータにバックアップデータを上書きしてバックアップを削除
            if (this.isLocalMode()) {
                var dirPath = this.localFileDirectoryPath();
                var filePath = this.localFilePathCommonSave(false);

                var fs = require("fs");
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
                fs.writeFileSync(filePath, compressed);
            } else {
                var key = this.webStorageKeyCommonSave(false);
                localStorage.setItem(key, compressed);
            }
        } catch (e) {
            // 復元に失敗した場合は例外
            console.error("Failed to restore backup common save.");
            console.error(e);
            throw e;
        }
    };

    /**
     * 共通セーブデータが存在しているかを確認する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {boolean} 共通セーブデータが存在している場合はtrueを返す。
     */
    StorageManager.existsCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        var ret = false;
        if (this.isLocalMode()) {
            ret = this.localFileExistsCommonSave(isBackup);
        } else {
            ret = this.webStorageExistsCommonSave(isBackup);
        }
        return ret;
    };

    /**
     * ローカルの共通セーブファイルが存在しているかを確認する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {boolean} ローカルの共通セーブファイルが存在している場合はtrueを返す。
     */
    StorageManager.localFileExistsCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        var filePath = this.localFilePathCommonSave(isBackup);
        var fs = require("fs");
        return fs.existsSync(filePath);
    };

    /**
     * WebStorage内に共通セーブデータが存在しているかを確認する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {boolean} WebStorage内に共通セーブデータが存在している場合はtrueを返す。
     */
    StorageManager.webStorageExistsCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        var key = this.webStorageKeyCommonSave(isBackup);
        return !!localStorage.getItem(key);
    };

    /**
     * 共通セーブデータを削除する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     */
    StorageManager.removeCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        if (this.isLocalMode()) {
            this.removeLocalFileCommonSave(isBackup);
        } else {
            this.removeWebStorageCommonSave(isBackup);
        }
    };

    /**
     * ローカル上の共通セーブファイルを削除する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     */
    StorageManager.removeLocalFileCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        var fs = require("fs");
        var filePath = this.localFilePathCommonSave(isBackup);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    };

    /**
     * WebStorage上の共通セーブデータを削除する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     */
    StorageManager.removeWebStorageCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        var key = this.webStorageKeyCommonSave(isBackup);
        localStorage.removeItem(key);
    };

    /**
     * 共通セーブデータのファイルパスを取得する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {string} 共通セーブデータのファイルパス。
     */
    StorageManager.localFilePathCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        var targetPath = this.localFileDirectoryPath() + utakata.CommonSaveManager.SAVE_FILENAME;
        if (isBackup) {
            targetPath += utakata.CommonSaveManager.BACKUP_LOCAL_EXT;
        }
        return targetPath;
    };

    /**
     * 共通セーブデータ用のWebStorageキーを取得する。
     * @memberof StorageManager
     * @static
     * @method
     * @param {boolean} [isBackup=false] バックアップを対象とするか。
     * @return {string} 共通セーブデータのWebStorageキー。
     */
    StorageManager.webStorageKeyCommonSave = function(isBackup) {
        if (isBackup === undefined) {
            isBackup = false;
        }
        var targetKey = utakata.CommonSaveManager.WEBSTORAGE_KEY;
        if (isBackup) {
            targetKey += utakata.CommonSaveManager.BACKUP_WEBSTORAGE_KEY_SUFFIX;
        }
        return targetKey;
    };

    //-----------------------------------------------------------------------------
    // Scene_Gameover
    //-----------------------------------------------------------------------------
    var _Scene_Gameover_Start = Scene_Gameover.prototype.start;
    Scene_Gameover.prototype.start = function() {
        if (utakata.CommonSaveManager.isAutoOnGameOver()) {
            utakata.CommonSaveManager.save();
        }
        _Scene_Gameover_Start.call(this);
    };

})(utakata);
