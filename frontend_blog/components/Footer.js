import Link from "next/link";

export default function Footer() {
    return <>
        <div className="footer">
            <div className="container flex flex-sb flex-wrap flex-left">
                <div className="footer_logo" data-aos="fade-right">
                    <h2>TechnoPKG</h2>
                    <h4>&copy; 2024 ALL Rights Reserved.</h4>
                    <h3>Developed By <span>@TechnoPKG</span></h3>
                </div>
                <div className="q_links" data-aos="fade-up">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href='/'>Advertise with us</Link></li>
                        <li><Link href='/'>About Us</Link></li>
                        <li><Link href='/'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="q_links" data-aos="fade-up">
                    <h3>Legal Stuff Links</h3>
                    <ul>
                        <li><Link href='/'>Privacy Notice</Link></li>
                        <li><Link href='/'>Cookie Policy</Link></li>
                        <li><Link href='/'>Terms Of Use</Link></li>
                    </ul>
                </div>
                <div className="q_links" data-aos="fade-left">
                    <h3>Social Media</h3>
                    <ul>
                        <li><Link href='/'>Github</Link></li>
                        <li><Link href='/'>Twitter</Link></li>
                        <li><Link href='/'>Instagram</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}