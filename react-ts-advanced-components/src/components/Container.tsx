import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react';

type ContainerProps<T extends ElementType> = {
    as?: T;      // this represents the TYPE of element that we want to render
    children: ReactNode;  // this represents text or other elements that can be rendered
} & ComponentPropsWithoutRef<T>;

export default function Container<C extends ElementType>({
    as,
    children,
    ...props
}: ContainerProps<C>) {
    const Component = as || 'div'; // We remap the name to be a Capital letter so we can render it as a component

    return <Component {...props}>{children}</Component>;
}
