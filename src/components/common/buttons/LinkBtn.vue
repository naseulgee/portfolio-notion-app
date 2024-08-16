<template>
    <slot></slot>
</template>

<style lang="scss" scoped>
:slotted(*){
    $btn-size: 1.5em;
    $btn-space: $btn-size * 2;

    padding: 0;
    padding-right: $btn-space;
    position: relative;
    color: var(--bs-body-color);
    text-decoration: none;
    &::before{
        content: '';
        width: calc(100% - $btn-space);
        height: 1px;
        background-color: var(--bs-gray-500);
        position: absolute;
        bottom: 0;
        transition: $transition-fast;
    }
    &::after {
        content: '';
        width: 10px;
        height: 10px;
        border: 1px solid var(--bs-gray-500);
        border-radius: 50%;
        box-sizing: content-box;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-$btn-size, -50%);
        background: var(--bs-white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffffff' d='M5,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z' /%3E%3C/svg%3E") no-repeat;
        background-position: -$btn-size center;
        background-size: contain;
        transition: $transition-fast, background-position 0.5s;
    }
    &:hover{
        &::before{
            width: 0;
        }
        &::after{
            width: $btn-size;
            height: $btn-size;
            border-color: $primary;
            transform: translate(0, -50%);
            background-color: $primary;
            background-position-x: center;
            box-shadow: $focus-ring-box-shadow;
        }
    }
}
</style>