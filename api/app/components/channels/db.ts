import { MysqlError, FieldInfo } from "mysql";
import { Channel } from "../../models/channel.model";

import db from '../dbpool'

const DATABASE_NAME = 'channel_manager_1_4'

class ChannelController {

    get_channel_by_id = (channel_id: number): Promise<Channel> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`channels` WHERE `id`=?;"
            db.query(sql, [channel_id], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    let c = results[0]
                    c.configuration=JSON.parse(c.configuration)
                    resolve(c)
                } 
            })
        })
    }
    
    get_all_channels = (): Promise<Channel[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`channels` ORDER BY `name` ASC;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results) reject(error)
                else {
                    results.forEach((channel: any) => channel.configuration=JSON.parse(channel.configuration))
                    resolve(results)
                }
            })
        })
    }
    
    new_channel = (channel: Channel): Promise<number> => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `"+DATABASE_NAME+"`.`channels` (`name`, `state`, `configuration`) VALUES (?, ?, ?);"
            db.query(sql, [channel.name, channel.state, JSON.stringify(channel.configuration)], (error:MysqlError|null, results: any) => {
                if(error || !results.insertId) reject(error)
                else resolve(results.insertId)
            })
        })
    }
    
    delete_channel = (channel_id: number): Promise<null> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`channels` WHERE `id`=?;"
            db.query(sql, [channel_id], (error:MysqlError|null, results: any) => {
                if(error || !results.insertId) reject(error)
                else resolve()
            })
        })
    }
    
    update_channel = (channel: Channel): Promise<null> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`channels` SET `name`=?, `configuration`=?, `state`=? WHERE `id`=?;"
            db.query(sql, [channel.name, JSON.stringify(channel.configuration), channel.state, channel.id], (error:MysqlError|null, results: any) => {
                if(error || !results.insertId) reject(error)
                else resolve()
            })
        })
    }
}

export default new ChannelController()