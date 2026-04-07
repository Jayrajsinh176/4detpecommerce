<?php

namespace App\Filament\Resources\Orderecoms\Pages;

use App\Filament\Resources\Orderecoms\OrderecomResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOrderecom extends EditRecord
{
    protected static string $resource = OrderecomResource::class;

    
    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
