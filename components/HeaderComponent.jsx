import React from "react";

import { Text, Avatar } from "@vizality/components";

export default ({ avatar, text }) => {
    return <>
        <Text style={{"margin-bottom": "5px"}}>
            <Avatar 
                className="an-avatar" 
                src={avatar} 
                isTyping={false} 
                isMobile={false} 
                status="online" 
                statusTooltip={false} 
                size={Avatar.Sizes.SIZE_16}
            />
            {text}    
        </Text>
    </>
}