/** NOTE: 문의 등록 */

const { Client } = require("@notionhq/client")
const database_id = process.env.NOTION_CONTACT_DATABASE_ID

exports.handler = async (request, context) => {
    const payload = JSON.parse(request.body)
    const { title, name, email, content } = payload
    const date = new Date().toISOString()
    try {
        // [참고] https://developers.notion.com/reference/create-a-database
        // [참고] https://developers.notion.com/reference/page-property-values
        const notion = new Client({ auth: process.env.NOTION_KEY })
        const res = await notion.pages.create({
            parent: { database_id },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ],
                },
                name: {
                    rich_text: [{
                        text: {
                            content: name
                        }
                    }],
                },
                email: {
                    email
                },
                content: {
                    rich_text: [{
                        text: {
                            content: content
                        }
                    }],
                },
                date: {
                    date: {
                        start: date
                    },
                },
            },
        })
        return {
            statusCode: 200,
            body: JSON.stringify(res), // 객체 데이터 -> 문자열
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: error.status,
            body: error.message,
        }
    }
}