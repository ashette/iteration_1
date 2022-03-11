import { extend, localize } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru.json';
import * as rules from 'vee-validate/dist/rules';
import {after}  from 'vee-validate/dist/rules';

localize("ru", ru);

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

extend('after', {
    validate: (value, [min]) => {
        console.log(value, min);
        return new Date(value) > new Date(min);
    },
    message: 'Поле {_field_} не должно иметь меньшее значение',
    hasTarget: true
});