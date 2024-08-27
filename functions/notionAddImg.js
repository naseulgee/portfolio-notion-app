/** NOTE: 프로젝트별 첨부 이미지 조회 */

const { Client } = require("@notionhq/client")
const database_id = process.env.NOTION_IMG_DATABASE_ID

exports.handler = async (request, context) => {
    const payload = JSON.parse(request.body)
    const { filter, sorts } = payload
    try {
        const notion = new Client({ auth: process.env.NOTION_KEY })
        let res = await notion.databases.query({
            database_id,
            filter,
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