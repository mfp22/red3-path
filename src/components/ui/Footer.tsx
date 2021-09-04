import React from 'react';

function SunnyvaleLogo(props: React.HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#e3e3e35e" d="M20 8l-8 14.2L2.8 5.8h4.4C8 .5 16 .5 16.8 5.8h4.4L20 8z" />
            {/* <path fill="#fcc10a" d="M20.3 6.3L12 21.1 3.7 6.3h4C8 1 15.8 1 16.2 6.3z" /> */}
            <path fill="currentColor" d="M12 10.3c-5.6-.2-4.7-8.4.8-7.4 4.3.8 3.6 7.5-.8 7.4zM12.1 10.9h.5l.6 6a10.8 10.8 0 01-.8 1.1c0-2.4-.2-4.8-.3-7.1zM11.6 18l-.7-1.1c0-1.6.3-5.3.5-6a4.5 4.5 0 00.5 0c0 2.3-.3 4.7-.3 7.1zM14.8 14.2l-1 1.4-1-4.8a2.5 2.5 0 00.8-.2l1.2 3.6zM11 10.8c0 .9-.7 4-1 4.7a12.4 12.4 0 01-.8-1.3l1.1-3.6a7 7 0 00.8.2z" />
            <path fill="currentColor" d="M8 12.2L9.4 10l.8.5c-.1.2-1 1.8-1.4 2.9L8 12zM14.6 10l1.4 2.2-.8 1.2c-.4-1-1-2-1.3-3a4.3 4.3 0 00.7-.4zM5.3 7.9l-.6-1.1h3a3.7 3.7 0 000 .8l-2.4.3zM18.6 7.9c-.7-.2-1.6-.2-2.4-.3l.1-.8h3zM5.8 8.6L7.9 8a7.8 7.8 0 00.4.8l-1.7 1-.8-1.2zM17.4 9.8l-1.7-1L16 8l2.1.7-.8 1.2zM9.1 9.8l-1.5 1.7-.7-1 1.7-1.3.5.6zM14.8 9.8a8 8 0 00.6-.6l1.6 1.3a9.8 9.8 0 01-.6 1c-.6-.5-1-1.1-1.5-1.7z" />
        </svg>
    );
}

function Footer() {
    return (
        <div className="text-center text-sm text-primary-900">Created by Max Zakharzhevskiy.
            Made in Sunnyvale, CA. <span>
                <SunnyvaleLogo className="inline-block w-6 h-6 text-yellow-600" />
            </span>
            <span>Open sourced on <a className="underline" href="https://github.com/maxzz/red3-path" target="_blank" rel="noopener">Github</a></span>
        </div>
    );
}

export default Footer;
