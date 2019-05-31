import React from 'react'

class Footer extends React.Component {

    getAuthor() {
        return "Jan Macek";
    }

    getYear() {
        let date = new Date();
        let year = date.getFullYear();
        return year;
    }

    getWebsite() {
        return "fel.cvut.cz";
    }

    websiteToUrl() {
        return "http://www."+this.getWebsite()+"/";
    }

    render() {
        return (
            <footer>
                {this.getAuthor()} © {this.getYear()} <a href={this.websiteToUrl()}>{this.getWebsite()}</a>
            </footer>
        )
    }
}

export default Footer