import  { render, screen } from '@testing-library/react'
import UrlTableView from './UrlTableView'
import { Provider } from 'react-redux'
import store from './../../app/store'

test('URL header is present', () => {
    render(
        <Provider store={store}>
            <UrlTableView />
        </Provider>)
    const textElement=screen.getByText('URL')
    expect(textElement).toBeInTheDocument()
})

test('Code Header is present', () => {
    render(
        <Provider store={store}>
            <UrlTableView />
        </Provider>)
    const textElement=screen.getByText('Code')
    expect(textElement).toBeInTheDocument()
})

test('Created at header is present', () => {
    render(
        <Provider store={store}>
            <UrlTableView />
        </Provider>)
    const textElement=screen.getByText('Created At')
    expect(textElement).toBeInTheDocument()
})

test('Action header is present', () => {
    render(
        <Provider store={store}>
            <UrlTableView />
        </Provider>)
    const textElement=screen.getByText('Action')
    expect(textElement).toBeInTheDocument()
})