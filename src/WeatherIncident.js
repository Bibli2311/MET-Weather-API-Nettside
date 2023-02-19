function WeatherIncident(props)
{
    let pTags = []
    
    
    let apiData = Array.from(props.sortedIncident.childNodes)

    console.log(apiData)

    apiData.forEach((htmlElement) => 
    {
        if (htmlElement.innerHTML != undefined)
        {
            pTags.push(htmlElement.innerHTML)
        }
    })

    let htmlList = pTags.map((text, index) =>
        {
            return <p key={index}>{text}</p>
        })

    return (
        <>
        <p key={-2}>{"weatherICNDI"}</p>
        {htmlList}</>
    )
}

export default WeatherIncident;