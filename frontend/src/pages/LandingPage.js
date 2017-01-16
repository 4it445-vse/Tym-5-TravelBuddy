import React, { Component } from 'react';
import { Button, Collapse, ListGroup, ListGroupItem } from 'react-bootstrap';
import { PageFooter } from '../components/LandingPage/PageFooter.js';
import { RegistrationForm } from '../components/Registration/RegistrationForm.js';
import { MainNavigation } from '../components/LandingPage/MainNavigation.js';
import { TopPropositions } from '../components/TopPropositions/TopPropositions.js';
import Scroll from 'react-scroll';

const Element = Scroll.Element;
const Link = Scroll.Link;

export class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {

    const faq = [
      ['1', 'Is application free?', 'Yes, every feature is accessible to everyone without any payment.'],
      ['2', 'Is it world-wide?', 'We are covering whole world, you can find buddy almost everywhere.'],
      ['3', 'How can I become a buddy?', 'You need to register yourself first, than enter your profile page and create offfer. That makes you a buddy.']
    ];

    return (

        <div id="main-wrapper">
            <MainNavigation/>
            <header>
                <div className="header-content">
                    <div className="header-content-inner">
                        <h1 id="homeHeading">Travel Buddy</h1>
                        <hr/>
                        <p>TravelBuddy helps travellers to connect with locals and provide them unique experience in discovering!</p>
                        <Link className="btn btn-primary btn-xl" to="about" spy={true} smooth={true} duration={500}>Find Out More</Link>
                    </div>
                </div>
            </header>



            <Element name="about">
                <aside className="">

                    <div className="container text-center">
                        <div className="call-to-action">
                            <h2>Top Offers</h2>
                            <hr className="primary"/>
                        </div>
                    </div>
                    <div className="container">
                        <TopPropositions limit="3" className="top-offers"/>
                    </div>
                </aside>
                <section className="bg-primary" id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading">At Your Service</h2>
                                <hr className="light"/>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-map-signs text-default sr-icons"></i>
                                    <h3>Plan Your Trip</h3>
                                    <p className="text-faded">Visiting new places, but not sure what is worthy to visit? Grab your buddy and find out!</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-globe text-default sr-icons"></i>
                                    <h3>Connect with People</h3>
                                    <p className="text-faded">Discover world with your travel buddy! Just click on buddy's offer and start packing!</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-money text-default sr-icons"></i>
                                    <h3>Free</h3>
                                    <p className="text-faded">Application is free for everyone! We want you to rather spend money on your trip!</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-heart text-default sr-icons"></i>
                                    <h3>Made with Love</h3>
                                    <p className="text-faded">We love travelling and we want to make it even better!</p>
                                </div>
                            </div>
                        </div>
                        <div className="row last">
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <Link className="btn btn-default btn-xl sr-button" to="register" spy={true} smooth={true} duration={500}>Get Started</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </Element>

            <Element name="faq">
                <section id="faq">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <h2 className="section-heading">Frequently Asked Questions</h2>
                                <hr className="primary"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2">
                                <ListGroup>
                                {faq.map(([key, question, answer]) => {
                                  return (
                                    <ListGroupItem key={key} header={question}>{answer}</ListGroupItem>
                                  );
                                })}
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                </section>
            </Element>

            {/* <section className="no-padding" id="portfolio">
            </section> */}

            <Element name="register">
                <section id="register">
                    <div className="container">
                        <div className="row text-center">
                            <Button className="btn btn-primary btn-xl sr-button" onClick={ ()=> this.setState({ open: !this.state.open })}>Register now!</Button>
                        </div>
                    </div>
                    <Collapse in={this.state.open}>
                        <section className="bg-dark registration-form-container">
                            <RegistrationForm/>
                        </section>
                    </Collapse>
                </section>
            </Element>

            <PageFooter/>

        </div>
    );
  };
}
