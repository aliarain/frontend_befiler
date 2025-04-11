// TaxHive: A collaborative tax platform where users can manage tax documentation, file returns, and access financial tools.
// TaxNexus: A hub for connecting users with tax professionals, tools, and resources to help them make informed tax decisions.
// ZenTax: A calm, organized platform focused on reducing tax filing stress through intuitive, streamlined tools.

const v1 = [
    {label: 'Standard', value: 'one'},
]

const v2 = [
    {label: 'Standard', value: 'one'},
]

const v3 = [
    {label: 'Standard', value: 'one'},
    {label: 'Natural', value: 'two'},
    {label: 'One Dark', value: 'three'}
]

export const getTheme = (version) => {
    if (version === 'v1') {
        return v1
    } else if (version === 'v2') {
        return v2
    } else if (version === 'v3') {
        return v3
    }
    return v1
}