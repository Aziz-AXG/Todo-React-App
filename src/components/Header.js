import React, { useState } from 'react'
import { useSpring, animated, config } from "react-spring";

const Header = () => {

            const [flip, setFlip] = useState(false);

            const props = useSpring({
                        delay: 1500,
                        from: { opacity: 0, y: 200 },
                        to: { opacity: 1, y: 0 },
                        config: config.molasses,
                        onRest: () => setFlip(!flip),
            });

            return (
                        <animated.h1 style={props}>Todo List</animated.h1>
            )
}

export default Header