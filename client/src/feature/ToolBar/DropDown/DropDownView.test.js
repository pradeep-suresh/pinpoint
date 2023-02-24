import  { render, screen } from '@testing-library/react'
import DropDownView from './DropDownView'
import { Provider } from 'react-redux'
import store from './../../../app/store'

test('Drop down bar renders', () => {
    render(
        <Provider store={store}>
            <DropDownView />
        </Provider>)
    const textElement=screen.queryAllByText('5')
    expect(textElement).toBeDefined()
})