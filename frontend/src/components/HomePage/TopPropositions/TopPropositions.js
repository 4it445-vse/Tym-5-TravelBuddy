import React, {Component} from 'react';
import {Table,Button} from 'react-bootstrap';

export class TopPropositions extends Component {
    render() {
        return (
            <div className="container">
                <div className="h3">The latest offers:</div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Service Type</th>
                        <th>Detail</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Jakub</td>
                        <td>Káňa</td>
                        <td>@xkanj</td>
                        <td>Service type</td>
                        <td><Button>Detail</Button></td>
                        <td><Button>Request for</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Service type</td>
                        <td><Button>Detail</Button></td>
                        <td><Button>Request for</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>Goldberg</td>
                        <td>@twitter</td>
                        <td>Service type</td>
                        <td><Button>Detail</Button></td>
                        <td><Button>Request for</Button></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Mar</td>
                        <td>Tyn</td>
                        <td>@bootstrap</td>
                        <td>Service type</td>
                        <td><Button>Detail</Button></td>
                        <td><Button>Request for</Button></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Jiří</td>
                        <td>Foršt</td>
                        <td>@surfing</td>
                        <td>Service type</td>
                        <td><Button>Detail</Button></td>
                        <td><Button>Request for</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}