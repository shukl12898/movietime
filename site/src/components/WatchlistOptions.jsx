import React from "react";
import { useState } from 'react';

export default function WatchlistOptions(props) {

   const [isShown, setIsShown] = useState(false);
   return(<div className="Movie Title">
      <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        { props.title }
      </button>
      {isShown && (
        <div>
          <button>
            +
          </button>
          <button>
            i
          </button>
          <button>
            $
          </button>
        </div>
      )}
    </div>
    );
}
