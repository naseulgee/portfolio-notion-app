/** NOTE: Netlify 내부에서 웹 프로젝트와 별도의 서버처럼 실행시켜주는 기능을 명시한 파일
 * [참고] https://docs.netlify.com/functions/get-started/
 * 
 * - Node.js 환경에서 동작한다
 * - ★/.netlify/functions/파일명 으로 요청 시 동작한다.
 * - 함수는 무조건 ★비동기로 명시한다
 * - return 값은 statusCode 와 body 를 포함해야 한다
 * - 네트워크로 주고받는 데이터는 문자열 데이터로, 문자열 <-> 객체 데이터 간의 전환이 필요하다
*/

const { Client } = require("@notionhq/client")
const database_id = process.env.NOTION_DATABASE_ID

exports.handler = async (request, context) => {
    const payload = JSON.parse(request.body)
    const { filter, sorts } = payload
    try {
        // [참고] https://developers.notion.com/reference/retrieve-a-page
        const notion = new Client({ auth: process.env.NOTION_KEY })
        let res = await notion.databases.query({
            database_id,
            filter,
            sorts,
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