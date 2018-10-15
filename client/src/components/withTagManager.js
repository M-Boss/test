/**
 * Created by guy on 10/14/18.
 */
import React, { Component } from 'react';
import ReactGA from 'react-ga';

export default function withTagManager(WrappedComponent, options = {}) {

    const HOC = class extends Component {

        send(){
            const dataLayerName = this.props.dataLayerName || 'dataLayer';
            const scriptId = this.props.scriptId || 'gtm-script';
            // if (!window[dataLayerName]) {
                const gtmScriptNode = document.getElementById(scriptId);

                eval(gtmScriptNode.textContent);
            // }
        }

        componentDidMount() {
            this.send()
        }

        componentWillReceiveProps(nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if (currentPage !== nextPage) {
                this.send();
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
}
