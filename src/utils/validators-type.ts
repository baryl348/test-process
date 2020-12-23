

export type ValidatorsType = (value:string)=> string | undefined



export const required:ValidatorsType = (value) => {
    if (value) return undefined;
    return "Поле обязательно для ввода";
}

export const maxLengthCreator = (maxLength:number):ValidatorsType => (value) => {
    if (value.length > maxLength) return `Максимальное колличество ${maxLength} символов`;
    return undefined;
}

export const email:ValidatorsType = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Некорректный email'
        : undefined

        export const match:any = (matchName:string) => (value:string, allValues:any) =>
  value !== allValues[matchName]
    ? `Это поле должно совпадать с полем пароля`
    : undefined

