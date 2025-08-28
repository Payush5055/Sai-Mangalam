// FIX: Replaced the module-based type definition for the `<model-viewer>` custom element 
// with a simpler global namespace augmentation. This avoids potential module resolution 
// issues and correctly extends JSX.IntrinsicElements to make TypeScript recognize the 
// custom element. This file is now treated as a script and augments the global scope directly.
declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
            src: string;
            'ios-src'?: string;
            alt: string;
            poster?: string;
            'camera-controls'?: boolean;
            'auto-rotate'?: boolean;
            ar?: boolean;
            'shadow-intensity'?: string;
            'environment-image'?: string;
            loading?: 'auto' | 'lazy' | 'eager';
            reveal?: 'auto' | 'interaction' | 'manual';
        }, HTMLElement>;
    }
}
