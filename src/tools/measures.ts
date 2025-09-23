export const toString = function(unit: CSSUnitValue){
    if (unit.unit === 'percent'){
        return `${unit.value}%`;    
    }
    return `${unit.value}${unit.unit}`;
}

export const pxToRem = function(px: number){
    return toString(CSS.rem(px / 16.0));
}

export const percent = function(percent: number){
    return toString(CSS.percent(percent));
}