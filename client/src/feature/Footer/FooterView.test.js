import  { render, screen } from '@testing-library/react'
import FooterView from './FooterView'
import { Provider } from 'react-redux'
import store from './../../app/store'

test('Previous button does not render', () => {
    render(
        <Provider store={store}>
            <FooterView />
        </Provider>)
    const textElement=screen.queryAllByText('Previous')
})

test('Next button does not render', () => {
    render(
        <Provider store={store}>
            <FooterView />
        </Provider>)
    const textElement=screen.queryAllByText('Previous')
})