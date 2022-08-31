export const validateNames = (newNames) => {
    console.log(123)
    if (!newNames) return 'Names are required'
    const names = newNames.trim()
    if (!lettersOnlyReg.test(names.replaceAll(' ', ''))) {
        return 'Name should consist of only letters'
    }

    const firstName = names.split(' ')[0]
    if (firstName.length < 3 || firstName.length > 30) return 'First name is out of range'

    return ''
}
