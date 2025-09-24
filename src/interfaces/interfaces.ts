import type { PasswordVisibility, Themes } from "../types/types";

export interface ApplicationContext {
    getTheme(): Themes;
    setTheme(theme: Themes): void
    subscribeToThemeListening(callback: CallableFunction): void
}

export interface PasswordVisibilityButtonContext extends ApplicationContext {
    visibilityChange(): void,
    getVisibility(): PasswordVisibility
}

export interface LoginFormContext extends ApplicationContext {
    setIsPasswordValid(value: boolean): void;    
    subscribeToPasswordListening(callback: CallableFunction): void
    setIsUsernameValid(value: boolean): void;    
    subscribeToUsernameListening(callback: CallableFunction): void
}

export interface LoginFormPasswordVisibilityButtonContext extends LoginFormContext {
    visibilityChange(): void,
    getVisibility(): PasswordVisibility
}