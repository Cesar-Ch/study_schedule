
const IconX = () => {
    return (
        <div className={` rounded-md hover:scale-110  dark:hover:bg-[#3c3c3f] hover:bg-gray-100 p-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
        </div>

    )
}


const IconToastError = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ef4444" className="icon icon-tabler icons-tabler-filled icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" /></svg>
    )
}

const IconLogo = () => {
    return (
        <svg width="50" height="50" viewBox="0 0 238 238" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="238" height="238" rx="20" fill="" /><path d="M165 150a4 4 0 0 1 4 4v9l3 3a4 4 0 0 1-6 6l-5-5v-13a4 4 0 0 1 4-4Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M69 48a4 4 0 1 1 8 0v21a4 4 0 1 1-8 0v-4H57a4 4 0 0 0-5 4v17h109V69a4 4 0 0 0-4-4h-13v-8h13a13 13 0 0 1 12 12v67a29 29 0 1 1-28 46H57a13 13 0 0 1-13-13V69a12 12 0 0 1 13-12h12v-9Zm67 117a29 29 0 0 1 25-29V94H52v75a4 4 0 0 0 5 4h80l-1-8Zm29 21a21 21 0 1 0 0-42 21 21 0 0 0 0 42Z" fill="currentColor" /><path d="M132 73a4 4 0 0 1-5-4v-4H86v-8h41v-9a4 4 0 1 1 9 0v21a4 4 0 0 1-4 4Z" fill="currentColor" /></svg>
    )
}

const IconGithub = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
    )
}


export { IconX, IconToastError, IconLogo, IconGithub }