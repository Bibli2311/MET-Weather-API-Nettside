import { render } from '@testing-library/react'
import {handleDropDown} from './App'

let yellowDangerLevelData =
`<rss version="2.0">
<channel>
  <title>MET farevarsel</title>
  <link>https://api.met.no</link>
  <description>Farevarsler fra Meteorologisk institutt</description>
  <language>no</language>
  <copyright>Copyright The Norwegian Meteorological Institute, licensed under Norwegian license for public data (NLOD) and Creative Commons 4.0 BY</copyright>
  <pubDate>Thu, 23 Feb 2023 08:42:35 +0000</pubDate>
  <lastBuildDate>Thu, 23 Feb 2023 08:42:35 +0000</lastBuildDate>
  <category>Met</category>
  <generator>XML::LibXML::Generator 0.1</generator>
  <docs>http://blogs.law.harvard.edu/tech/rss</docs>
  <image>
    <title>MET farevarsel</title>
    <link>https://api.met.no</link>
    <url>https://api.met.no/images/logo_2013_no.png</url>
  </image>
  <item>
    <title>Kuling, gult nivå, Obrestad - Slåtterøy:, 23 February 18:00 UTC til 23 February 22:00 UTC.</title>
    <description>Alert: I kveld, torsdag, auking til sørvest stiv kuling 15 m/s. Dreiande vest og minkande seint i kveld. </description>
    <link>https://api.met.no/weatherapi/metalerts/1.1/?cap=2.49.0.1.578.0.230223083612430.639</link>
    <author>post@met.no (The Norwegian Meteorological Institute)</author>
    <category>Met</category>
    <guid>2.49.0.1.578.0.230223083612430.639</guid>
    <pubDate>Thu, 23 Feb 2023 08:36:12 +0000</pubDate>
  </item>
</channel>
</rss>  `

test('check if correct data is rendered', () =>
{
    let parser = new DOMParser()
    let xmlDocument = parser.parseFromString(yellowDangerLevelData, "text/xml")

    let anAction = 
    {
        type: "faresignal",
        xmlData: xmlDocument,
        parameter: "gult"
    }

    let result = handleDropDown(null, anAction)
    let r = render(render.htmlData)
    console.log(r)
    expect(r).toBe(1)

})