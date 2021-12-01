const sb = require('@supabase/supabase-js')

const supabase = sb.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

const handler = async(event, context) => {
    try {
        const { data, error } = await supabase
            .from('classes')
            .select('id, duration, score, company, title, scoreCount')

        if (error) {
            return {
                statusCode: 501,
                body: error
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ data: data })
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }