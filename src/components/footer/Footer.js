import Link from "next/link"

const getCurrentYear = () => {
    const currentDate = new Date() 
    const currentYear = currentDate.getFullYear()
    return currentYear
}

export default () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link href="/privacy-policy">
                    Privacy Policy
                </Link>
                <Link href="/terms-and-conditions">
                    Terms and Conditions
                </Link>
            </div>
            <div className="footer-info">
                <div className="footer-info-logo">
                    <img src="/ataLogo.svg"/>
                </div>
                <div className="footer-info-copyright">
                    <p>
                        &copy; AllThingsAirplanes LLC 2023 &mdash; {getCurrentYear()}
                    </p>
                </div>
            </div>
        </footer>
    )
}