const { Client } = require("@notionhq/client")

exports.handler = async (request, context) => {
    const payload = JSON.parse(request.body)
    try {
        const notion = new Client({ auth: process.env.NOTION_TASK_REPORT_KEY })
        let res = await notion.databases.query(payload)
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