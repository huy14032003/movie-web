"use client";
import React, { useState } from 'react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
} from '@floating-ui/react';
import CardZoom from './CardZoom';
import { Movie } from '@/types/movie';

interface MovieTooltipProps {
    movie: Movie;
    children: React.ReactElement;
}

const MovieTooltip = ({ movie, children }: MovieTooltipProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'top',
        middleware: [
            offset(({ rects }) => {
                // Calculate offset để centered: di chuyển tooltip về center của card
                return -rects.reference.height / 2 - rects.floating.height / 2;
            }),
            flip({ fallbackPlacements: ['left', 'top', 'bottom'] }),
            shift({ padding: 8 }),
        ],
        whileElementsMounted: autoUpdate,
        strategy: 'fixed',
    });

    const hover = useHover(context, {
        delay: { open: 500, close: 100 },
        move: false,
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ]);

    return (
        <>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </div>
            {isOpen && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={{
                            ...floatingStyles,
                            zIndex: 9999,
                        }}
                        {...getFloatingProps()}
                    >
                        <div className="w-[350px] h-[400px]">
                            <CardZoom movie={movie} />
                        </div>
                    </div>
                </FloatingPortal>
            )}
        </>
    );
};

export default MovieTooltip;
