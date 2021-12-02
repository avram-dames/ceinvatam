const sb = require('@supabase/supabase-js')

const supabase = sb.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

function responde(data, error) {
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
}

const handler = async(event, context) => {
    try {
        const query = event.queryStringParameters.query
        const filter = event.queryStringParameters.filter

        let filterList = [1, 2, 3, 4]

        if (filter) {
            filterList = filter.split(', ').map(id => Number(id))
        }

        if (query) {
            const { data, error } = await supabase
                .from('classes')
                .select('id, duration, score, company, title, scoreCount, class2city!inner(city_id)')
                .textSearch('title', query)
                .in('class2city.city_id', filterList)
                .order("id", { ascending: true })
                .range(0, 9);
            return responde(data, error)
        } else {
            const { data, error } = await supabase
                .from('classes')
                .select('id, duration, score, company, title, scoreCount, class2city!inner(city_id)')
                .in('class2city.city_id', filterList)
                .order("id", { ascending: true })
                .range(0, 9);
            return responde(data, error)
        }
    } catch (error) {
        return { statusCode: 500, body: error }
    }
}

module.exports = { handler }