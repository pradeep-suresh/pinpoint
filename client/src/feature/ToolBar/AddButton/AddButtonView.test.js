import  { render, screen } from '@testing-library/react'
import AddButton from './AddButtonView'
import { Provider } from 'react-redux'
import store from './../../../app/store'

test('Add button renders', () => {
    render(
        <Provider store={store}>
            <AddButton />
        </Provider>)
    const textElement=screen.queryAllByText('Add')
    expect(textElement).toBeDefined()
})