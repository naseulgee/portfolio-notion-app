/** NOTE: 스킬 목록 조회 */

const { Client } = require("@notionhq/client")
const database_id = process.env.NOTION_SKILS_DATABASE_ID

exports.handler = async (request, context) => {
    const payload = JSON.parse(request.body)
    const { sorts } = payload
    try {
        const notion = new Client({ auth: process.env.NOTION_KEY })
        const res = await notion.databases.query({
            database_id,
            sorts,
        })
        return {
            statusCode: 200,
            body: JSON.stringify(res),
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: error.status,
            body: error.message,
        }
    }
}