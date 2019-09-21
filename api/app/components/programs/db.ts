import { MysqlError } from "mysql";
import { Program } from "../../models/program.model";
import db from '../dbpool'

const DATABASE_NAME = 'channel_manager_1_4'

class ProgramController {
    
    new_program = (program: Program): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO \`${DATABASE_NAME}\`.\`programs\` 
                (\`name\`, \`channel_id\`, \`state\`, \`start_time\`, \`end_time\`, \`media_node_list\`) 
                VALUES (?, ?, ?, ?, ?, ?);`,
                [program.name, program.channel_id, program.state, program.start_time, program.end_time, JSON.stringify(program.media_node_list)], 
                (error:MysqlError|null, results: any) => {
                    if(error || !results.insertId) reject(error)
                    else resolve(results.insertId)
            })
        })
    }

    get_program_by_id = (program_id: number): Promise<Program> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`programs` WHERE `id`=?;"
            db.query(sql, [program_id], (error:MysqlError|null, results: any) => {
                if(error || !results) {
                    reject(error)
                }
                else {
                    let c = results[0]
                    if(c) c.media_node_list=JSON.parse(c.media_node_list)
                    resolve(c)
                } 
            })
        })
    }
    
    get_all_programs = (): Promise<Program[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`programs` ORDER BY `name` ASC;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results) reject(error)
                else {
                    results.forEach((program:any)=>program.media_node_list=JSON.parse(program.media_node_list))
                    resolve(results)
                }
            })
        })
    }
    
    get_all_programs_by_channel = (channel_id:number): Promise<Program[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`programs` WHERE `channel_id`=? ORDER BY `name` ASC;"
            db.query(sql, [channel_id], (error:MysqlError|null, results: any) => {
                if(error || !results) reject(error)
                else {
                    results.forEach((program:any)=>program.media_node_list=JSON.parse(program.media_node_list))
                    resolve(results)
                }
            })
        })
    }

    get_programs_by_start_time_range = (channel_id:number, start:number, end:number): Promise<Program[]> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM \`${DATABASE_NAME}\`.\`programs\` 
                WHERE \`channel_id\`=? AND \`start_time\`>=? AND \`start_time\`<=?
                ORDER BY \`start_time\` ASC;`,
                [channel_id, start, end], 
                (error:MysqlError|null, results: any) => {
                    if(error || !results) {
                        reject(error)
                    }
                    else {
                        results.forEach((program:any)=>program.media_node_list=JSON.parse(program.media_node_list))
                        resolve(results)
                    }
                }
            )
        })
    }

    get_programs_by_total_time_range = (channel_id:number, start:number, end:number): Promise<Program[]> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM \`${DATABASE_NAME}\`.\`programs\` 
                WHERE \`channel_id\`=? AND \`end_time\`>=? AND \`start_time\`<=?
                ORDER BY \`start_time\` ASC;`,
                [channel_id, start, end], 
                (error:MysqlError|null, results: any) => {
                    if(error || !results) {
                        reject(error)
                    }
                    else {
                        results.forEach((program:any)=>program.media_node_list=JSON.parse(program.media_node_list))
                        resolve(results)
                    }
                }
            )
        })
    }

    get_all_programs_after_time = (time:number): Promise<Program[]> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM \`${DATABASE_NAME}\`.\`programs\` 
                WHERE \`start_time\`>=? ORDER BY \`start_time\` ASC;`,
                [time], 
                (error:MysqlError|null, results: any) => {
                    if(error || !results) {
                        reject(error)
                    }
                    else {
                        results.forEach((program:any)=>program.media_node_list=JSON.parse(program.media_node_list))
                        resolve(results)
                    }
                }
            )
        })
    }

    get_last_program_before_time = (channel_id:number, time:number): Promise<Program> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM \`${DATABASE_NAME}\`.\`programs\`
                WHERE \`channel_id\`=? AND \`start_time\`<?
                ORDER BY \`start_time\` ASC LIMIT 1;`,
                [channel_id, time],
                (error:MysqlError|null, results: any) => {
                    if(error || !results || !results.length) {
                        reject(error)
                    }
                    else {
                        let program = results[0]
                        if(program) program.media_node_list = JSON.parse(program.media_node_list)
                        resolve(program)
                    }
                }
            )
        })
    }
    
    update_program = (program: Program): Promise<null> => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE \`${DATABASE_NAME}\`.\`programs\` 
                SET \`name\`=?, \`channel_id\`=?, \`state\`=?, \`start_time\`=?, \`end_time\`=?, \`media_node_list\`=? WHERE \`id\`=?;`,
                [program.name, program.channel_id, program.state, program.start_time, program.end_time, JSON.stringify(program.media_node_list), program.id], 
                (error:MysqlError|null, results: any) => {
                    if(error || !results.insertId) reject(error)
                    else resolve()
                }
            )
        })
    }
    
    delete_program = (program_id: number): Promise<null> => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM \`${DATABASE_NAME}\`.\`programs\` WHERE id=?;`,
                [program_id], (error:MysqlError|null, results: any) => {
                    if(error || !results.insertId) reject(error)
                    else resolve()
                }
            )
        })
    }
    
    delete_program_list = (program_id_list: number[]): Promise<Program[]> => {
        return new Promise((resolve, reject) => {
            let total_programs = program_id_list.length
            let updated_programs = 0
            program_id_list.forEach((pid: number) => {
                this.delete_program(pid).then(() => {
                    updated_programs++
                }).catch((err) => {
                    console.error(err)
                    total_programs--
                })
            })
            let st = new Date().getTime()
            let int = setInterval(() => {
                if(total_programs===updated_programs) {
                    clearInterval(int)
                    resolve()
                }
                if(new Date().getTime()-st > 8000) {
                    clearInterval(int)
                    reject("Database timeout")
                }
            }, 200)
        })
    }

    delete_all_programs_by_channel = (channel_id: number): Promise<null> => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM \`${DATABASE_NAME}\`.\`programs\` WHERE \`channel_id\`=?;`,
                [channel_id], (error:MysqlError|null, results: any) => {
                    if(error || !results.insertId) reject(error)
                    else resolve()
                }
            )
        })
    }
}

export default new ProgramController()