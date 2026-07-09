import { MapPin } from "lucide-react";

import { TextField } from "../fields/TextField";
import { MaskedField } from "../fields/MaskedField";
import { SectionHeading } from "./SectionHeading";

import type { CompanyBaseFormData } from "../types";

type Props = {
    formData: CompanyBaseFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AddressSection({ formData, onChange }: Props) {
    return (
        <div>
            <SectionHeading
                icon={MapPin}
                title="Endereço"
                subtitle="Informações de localização"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MaskedField
                    label="CEP"
                    name="cep"
                    mask="_____-___"
                    value={formData.cep}
                    onChange={onChange}
                    placeholder="11325-030"
                />

                <TextField
                    label="Estado"
                    name="state"
                    value={formData.state}
                    onChange={onChange}
                    placeholder="SP"
                />

                <TextField
                    label="Cidade"
                    name="city"
                    value={formData.city}
                    onChange={onChange}
                    placeholder="São Paulo"
                />

                <TextField
                    label="Endereço"
                    name="address"
                    value={formData.address}
                    onChange={onChange}
                    placeholder="Rua, número e bairro"
                    className="md:col-span-2"
                />
            </div>
        </div>
    );
}
