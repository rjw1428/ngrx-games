import { writeFileSync } from 'fs'
import * as path from 'path'
const fileName = "config.json"

export function setConfig(playersConfig) {
    console.log("Setting game config...");
    console.log(playersConfig)
    writeFileSync(path.join(__dirname, fileName), JSON.stringify(playersConfig))
}
