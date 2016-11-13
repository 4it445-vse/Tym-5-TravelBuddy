import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';


export class SearchSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientErrors: {},
            errors: {},
            formSuccess: false
        };

    }

    createField(type, key, desc, values) {
        switch (type) {
            case 'text':
            case 'password':
            case 'email':
                if (!desc) {
                    return (
                        <FormControl
                            type={type}
                            name={key}
                        />
                    );
                }
                else {
                    const popover = this.createPopover(desc);
                    return (
                        <OverlayTrigger trigger="focus" placement="right" overlay={popover} delay={100}>
                            <FormControl type={type} name={key} />
                        </OverlayTrigger>
                    );
                }

            case 'date':
                return (
                    <DatePicker
                        type="birthdate"
                        name="birthdate"
                    />
                );



            default:
                return {};
        }
    }



    render() {
        const fields = [
            /*key, label, type, desc, array with possible choices*/
            ['city', 'City', 'text', ''],
            ['dateFrom', 'Date from', 'text', ''],
            ['dateTo', 'Date to', 'date', ''],
            ['service', 'Service Type', 'text', ''],
            ['priceFrom', 'Price from', 'text', ''],
            ['priceTo', 'Price to', 'text', ''],

        ];

        return (
            <div>
                <form  className="form-horizontal">
                    {fields.map(([key, label, type, desc]) => {
                        return (
                                <FieldGroup key={key}
                                    id="formControlsText"
                                    type={type}
                                    label={label}
                                    placeholder={label}
                                />
                        );
                    })}

                    <Button type="submit" bsStyle="primary">Search!</Button>
                </form>
            </div>
        );
    }
}