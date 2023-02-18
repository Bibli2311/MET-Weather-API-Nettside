import renderer from 'react-test-renderer'
import App from './App'

it("Test if data is sorted correctly", () =>
{
    const component = renderer.create(
        <App/>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})