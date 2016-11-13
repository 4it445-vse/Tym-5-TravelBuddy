import React, {Component} from 'react';
import {Table,Button} from 'react-bootstrap';

export class TopPropositions extends Component {
    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Service Type</th>
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
                        <td><Button>Propose</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Service type</td>
                        <td><Button>Propose</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>Goldberg</td>
                        <td>@twitter</td>
                        <td>Service type</td>
                        <td><Button>Propose</Button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Mar</td>
                        <td>Tyn</td>
                        <td>@bootstrap</td>
                        <td>Service type</td>
                        <td><Button>Propose</Button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Jiří</td>
                        <td>Foršt</td>
                        <td>@surfing</td>
                        <td>Service type</td>
                        <td><Button>Propose</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}