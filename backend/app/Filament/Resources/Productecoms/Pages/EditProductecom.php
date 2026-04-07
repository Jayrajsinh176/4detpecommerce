<?php

namespace App\Filament\Resources\Productecoms\Pages;

use App\Filament\Resources\Productecoms\ProductecomResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditProductecom extends EditRecord
{
    protected static string $resource = ProductecomResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
