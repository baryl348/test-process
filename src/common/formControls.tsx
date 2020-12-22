import React from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { ValidatorsType } from '../utils/validators-type';
import style from './form.module.scss'

type FormControlsParamsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlsParamsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={hasError ? style.errorInput : ""}>
            <div>
                {children}
            </div>
            {hasError && <span className={style.spanError} ><div className={style.box}></div><div>{error}</div></span>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} className='login_input' /></FormControl>
}

export function createField<formKeysType extends string>(placeholder: string | undefined, name: formKeysType,
    validators: Array<ValidatorsType>, component: React.FC<WrappedFieldProps>, type: string, props = {},) {
    return <Field placeholder={placeholder} name={name}
        validate={validators}
        component={component}
        type={type}
        {...props}
    />
}