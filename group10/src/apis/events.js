
// hämtar api från dess url
const apiUrl = 'http://localhost:3001'

//FETCH hämtar tillgängliga händelser
export const fetchEvent = async (event) => {
    const response = await fetch(`${apiUrl}/events`)
// Returnerar response som tillgängliga händelser sparade i json filen
    return await response.json()
    }

//POST exporterar och sparar händelsen
export const storeEvent = async (event) => {
// {} samt lägger till /events
    return await fetch (`${apiUrl}/events`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
//strängifierar input till events
        body: JSON.stringify(event)
    })
}

// PUT Ändrar och sparar händelsen under sitt ID
export const changeEvent  = async (event, id) => {
// {} samt lägger till events i sitt ID med PUT
    return await fetch (`${apiUrl}/events/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
//strängifierar input till events
        body: JSON.stringify(event)
    })
}

// DELETE Tar bort händelsen med hjälp av dess ID
export const deleteEvent  = async (id) => {
    // {} samt lägger till /events
        return await fetch (`${apiUrl}/events/${id}`,{
            method: 'DELETE '
        })
    }
