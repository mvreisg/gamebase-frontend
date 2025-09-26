import type { CSSStyle, PasswordVisibility, Themes, WarningParagraphVisibility } from "../types/types";

export interface ApplicationContext {
    getTheme(): Themes;
    setTheme(theme: Themes): void
    subscribeToThemeListening(callback: CallableFunction): void
}

export interface PasswordVisibilityButtonContext extends ApplicationContext {
    setVisibility(value: PasswordVisibility): void,
    getVisibility(): PasswordVisibility
}

export interface LoginFormContext extends ApplicationContext {
    setIsPasswordValid(value: boolean): void;    
    subscribeToPasswordListening(callback: CallableFunction): void
    setIsUsernameValid(value: boolean): void;    
    subscribeToUsernameListening(callback: CallableFunction): void
}

export interface LoginFormPasswordVisibilityButtonContext extends LoginFormContext {
    setVisibility(value: PasswordVisibility): void,
    getVisibility(): PasswordVisibility
}

export interface ElementParameters {
    id?: string,    
    classes?: string[]|undefined,
    styles?: CSSStyle|undefined
}

export interface TitleElementParameters extends ElementParameters {
    text: string
}

export interface TextInputWarningParagraphElementParameters extends ElementParameters {
    text: string
}

export interface ElementProperties {
    element: HTMLElement,    
}

export interface TextInputElementProperties extends ElementProperties {
    methods: {
        getValue(): string
    }
}

export interface TextInputWarningParagraphElementProperties extends ElementProperties {
    methods: {
        getVisibility(): WarningParagraphVisibility,
        setVisibility(value: WarningParagraphVisibility): void
    }
}

export interface PasswordVisibilityButtonElementProperties extends ElementProperties {
    methods: {
        setSvg(): void
    }
}

export interface CheckInputElementProperties extends ElementProperties {
    methods: {
        setChecked(value: boolean): void
        getChecked(): boolean
    }
}